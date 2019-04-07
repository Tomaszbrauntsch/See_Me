//Initializes the Pins location
const int trigPin = 6;
const int echoPin = 5;
long duration, inches;

void setup() {
  //Initializes Pins as I/O
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  //The running of the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  // Sets the trigPin on HIGH state for 10 micro seconds
  pinMode(echoPin, INPUT);
  duration = pulseIn(echoPin, HIGH);

  //Convertion of duration to inches
  inches = (duration/2) / 74;

  Serial.print(inches);
  Serial.println();

  delay(2000);
}
