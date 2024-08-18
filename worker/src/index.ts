import {Kafka } from 'kafkajs'

const TOPIC_NAME = "zap-start";
const kafka = new Kafka({
    clientId:'outbox-processor',
    brokers: ['localhost:9092']
})
async function main(){
    const consumer = kafka.consumer({groupId:"main-worker3"});
    await consumer.connect();
    await consumer.subscribe({topic: TOPIC_NAME, fromBeginning:true});
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) =>{
            console.log(
                {
                    partition,
                    offset:message.offset,
                    value:message.value?.toString()
                }
            )
            await new Promise(r => setTimeout(r,2000));
            await consumer.commitOffsets([{
                topic: TOPIC_NAME,
                partition:partition,
                offset:(parseInt(message.offset)+1).toString()
            }])
        }
    })
}

main();