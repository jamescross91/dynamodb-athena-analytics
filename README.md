# DynamoDB Athena Analytics
A simple service and serverless configuration for streaming data from DynamoDB into S3 with the goal of leverage Amazon Athena to perform aggregation style analytics on the data - something impossible with the DynamoDB query DSL.

## Data Flow
The aim is to have a serverless framework that replicates data from DynamoDB in near real time in an S3 bucket so that we can perform SQL queries against it using Amazon Athena.

1. Producer Lambda - runs every 5 minutes to insert some random data into the DynamoDB table
2. DynamoDB Stream - A real time stream of events/operations performed against the DynamoDB table
3. Stream Handler Lambda - Invoked for batches of DynamoDB events and used to deserialize each event and insert the updated record into a Kinesis Firehose delivery stream
4. Kinesis Firehose Delivery Stream - Buffers events arriving and writes the output to an S3 bucket
5. S3 Bucket - Contains data arriving from Kinesis Firehose
6. Athena - Used for SQL query execution against the data.

## Setup
Everything is automated using the Serverless Framework.  Resource names are all defined in serverless.yml.  To deploy and run the entire stack simple type `serverless deploy -v`.

## Seeding initial data
If you're too impatient to wait for the first producer lambda to run you can invoke it locally using `serverless invoke local -f produce`.

