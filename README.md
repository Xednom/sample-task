# sample-task
A sample task

# Project setup
Inside the project folder do ```pipenv install```

Fill up the credentials in the .env to your local dev, I've included my personal .env just edit it to your use. 
Below is the sample
```
DEBUG=True
DJANGO_SECRET_KEY='<django secret key>'

# Database
DATABASE_NAME=<database name>
DATABASE_USER=<database user>
DATABASE_PASSWORD=<database password>
DATABASE_HOST=<database host>
DATABASE_PORT=<database port>
```

Create the database first in MySQL with the database name of **sample**
then follow the procedures below.

Migrate DB
``` python manage.py migrate ```

start local server
``` python manage.py runserver ```

Create users(1 superuser and 1 normal account)
``` python manage.py loadddata user ```
password for the created users is **fishmond22**

Create api sample data for Contact, Address, Phone
``` python manage.py loaddata create_data ```

# Access the API endpoint
To access the **API** root go to ```<localhost:8000>/api/v1/ or <127.0.0.1:8000>/api/v1/```

# Access the Site
To access the home page of the site go to ``` <localhost:8000> or  <127.0.0.1:8000>```
