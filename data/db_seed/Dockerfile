FROM mongo

COPY national-toxlabs.csv ./national-toxlabs.csv
CMD mongoimport --host sa_bot_db --db national-toxlabs --collection toxlabs --type csv --file /national-toxlabs.csv --headerline