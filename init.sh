#https://learn.microsoft.com/en-us/sql/linux/sql-server-linux-docker-container-security?view=sql-server-ver16
#https://learn.microsoft.com/en-us/sql/linux/sql-server-linux-docker-container-security?view=sql-server-ver16#set-the-non-root-user-as-the-owner-of-the-files
mkdir sqlserverdata
mkdir ./sqlserverdata/data && sudo chown 10001 ./sqlserverdata/data
mkdir ./sqlserverdata/log && sudo chown 10001 ./sqlserverdata/log
mkdir ./sqlserverdata/secrets && sudo chown 10001 ./sqlserverdata/secrets
mkdir ./sqlserverdata/datasql && sudo chown 10001 ./sqlserverdata/datasql
mkdir ./sqlserverdata/logsql && sudo chown 10001 ./sqlserverdata/logsql
