import pyodbc
from fastapi import FastAPI, HTTPException, Header
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta, timezone
from typing import Optional
from datetime import date, time

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SERVER = "localhost"
DATABASE = "examen"


class Visitante(BaseModel):
    dpi: int
    nombre: str
    apellido: str
    telefono: str
    direccion: str


class Funcionario(BaseModel):
    dpi: int
    nombre: str
    apellido: str
    idEdificio: int
    idOficina: int


class Visita(BaseModel):
    idVisitante: int
    fecha: date
    hora: time


class TramiteVisita(BaseModel):
    idVisitante: int
    idTramite: int
    fecha: date


class Oficina(BaseModel):
    numeroOficina: int
    idEdificio: int
    oficina: str


class Edificioid(BaseModel):
    idEdificio: int


class VisitanteDPI(BaseModel):
    visitanteDPI: str


class Edificio(BaseModel):
    edificio: str


class Tramite(BaseModel):
    tramite: str


class UserLogin(BaseModel):
    username: str
    password: str



class Database:
    def __init__(self):
        self.conn: pyodbc.Connection
        self.cursor: pyodbc.Cursor
        self.conn_status = False

    def connect(self, USERNAME, PASSWORD):
        connection_string = (
            f"DRIVER={{ODBC Driver 18 for SQL Server}};"
            + f"SERVER={SERVER};"
            + f"DATABASE={DATABASE};"
            + f"UID={USERNAME};"
            + f"PWD={PASSWORD};"
            + f"TrustServerCertificate=Yes"
        )
        self.conn = pyodbc.connect(connection_string)
        self.cursor = self.conn.cursor()
        self.conn_status = True

    def get_conn_status(self):
        return self.conn_status

    def get_conn(self):
        return self.conn

    def close(self):
        self.conn_status = False
        if self.cursor:
            self.cursor.close()
        if self.conn:
            self.conn.close()

    def get_cursor(self) -> pyodbc.Cursor:
        return self.cursor


db = Database()


def fetch_data_from_stored_procedure(sp_name: str, params: list = []):
    if db.get_conn_status():
        try:
            cursor = db.get_cursor()

            placeholders = ", ".join(["?" for _ in params])
            query = f"EXEC {sp_name} {placeholders}"

            cursor.execute(query, params)

            columns = [column[0] for column in cursor.description]

            results = [dict(zip(columns, row)) for row in cursor.fetchall()]
            return results

        except Exception as e:
            return {"error": str(e)}


def execute_stored_procedure(sp_name: str, params: list):
    if db.get_conn_status():
        try:
            cursor = db.get_cursor()
            conn = db.get_conn()

            placeholders = ", ".join(["?" for _ in params])
            query = f"EXEC {sp_name} {placeholders}"

            cursor.execute(query, params)
            conn.commit()
            return {"message": "Exitoso"}

        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))


@app.on_event("startup")
def startup_event():
    db.connect("sa", "fakePassw0rd")
    print("conectado")

@app.on_event("shutdown")
def shutdown_event():
    db.close()

@app.get("/visitantes")
async def get_Visitantes():
    sp_name = "Ver_Visitantes"
    data = fetch_data_from_stored_procedure(sp_name)

    return data


@app.get("/edificios")
async def get_Edificios():
    sp_name = "pe"
    data = fetch_data_from_stored_procedure(sp_name)

    return data


@app.get("/tramites")
async def get_tramites():
    sp_name = "Ver_Tramites"
    data = fetch_data_from_stored_procedure(sp_name)

    return data


@app.post("/oficina-by-edificio")
async def get_oficina_by_edificio(
    edificioid: Edificioid,
):
    sp_name = "Ver_Oficina_by_Edificio"
    params = [edificioid.idEdificio]
    data = fetch_data_from_stored_procedure(sp_name, params)

    return data



@app.post("/insertar-visitante")
async def insert_data(
    visitante: Visitante,
):
    sp_name = "Insert_Visitante"
    params = [
        visitante.dpi,
        visitante.apellido,
        visitante.nombre,
        visitante.direccion,
        visitante.telefono,
    ]

    result = execute_stored_procedure(sp_name, params)

    return result
