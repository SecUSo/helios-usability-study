## Cast-as-intended Verification Userinterface Study

This project is a collection of three different user-interfaces for cast-as-intended verification using the Benaloh Challenge.<br />
As this solely is the user-interface a component for tallying and administering elections is not included. <br />
Furthermore encryption is only simulated and thus we do not recomment to use this interface for serious elections as secrecy can be broken easily. 

## Download and more Information

### Building 

Requirements:
* Python 3.5
* Django 1.11

There are two options of hosting the application: With or without virtualenv 

If you intend to use virtualvenv, navigate to your desired directory and start by: 

    pyenv env
    source env/bin/activate

On a production server this probably is located somewhere in /var/www , on a developers computer this normally is located somewhere in your $HOME.

Now you can clone the sourcecode of the application into your directory:

    https://github.com/Yonjuni/helios-usability-study.git

After that you should have a subdirectory helios-usability-study/ and if you created a virtualenv also a subdirectory env/. The actual applications are in the directories helios_institutes/, helios_main/ and helios_smartphone/. Please navigate into the helios-usability-study/ directory. 

The application itself is done, but you need to initialize your database. You can canfigure helios-usability-study/settings.py to use mySQL or PostGreSQL described here. Or you can leave the file as it is to use sqlite. 

Initialize your database with

    ./manage.py makemigrations
    ./manage.py migrate
    ./manage.py migrate --run-syncdb


If you would like to add initial task data for testing or so you can do this by

    python manage.py sample_data

Sample data can be found in sample_data.json file, it is written in Jason format and can of course be changed. Sample data added by default consists of a list of parties which are probably running for the Bundestag election in 2017.
    
    
Start a development Server
--------------------------
If you intend to make some changes, you can start the application now with

    python manage.py runserver
    
The application can be accessed under the url `http://localhost:8000`.

## License

Helios Userinterface Study is licensed under the GPLv3.
Copyright (C) 2016  Karola Marky

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.


## Contributors

Github-Users: <br />
Yonjuni


