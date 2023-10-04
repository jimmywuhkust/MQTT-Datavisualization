const mqttServer = "mqtt.jinfinite.com.hk";
const mqttUsername = "greenhub";
const mqttPassword = "greenhub";
const mqttTopic = "watersensor"; // Replace this with the desired MQTT topic

const client = mqtt.connect(`ws://${mqttServer}:9001`, {
    username: mqttUsername,
    password: mqttPassword
});

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe(mqttTopic, (err) => {
        if (err) {
            console.error('Failed to subscribe to MQTT topic:', err);
        } else {
            console.log('Subscribed to MQTT topic:', mqttTopic);
        }
    });
});

client.on('message', (topic, message) => {
    // The message received from MQTT will be a buffer, convert it to a string
    const data = message.toString();
    console.log('Received MQTT message:', data);
    flow_update(data); // Update the UI with the received data
});
