#! /bin/bash

mongoimport --host sa_bot_db --db national-toxlabs --collection toxlabs --type csv --file /db_seed/national-toxlabs.csv --headerline