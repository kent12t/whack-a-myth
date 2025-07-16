const int buttonPin1 = 2;
const int ledPin1    = 13;
const int buttonPin2 = 7;
const int ledPin2    = 8;

void setup() {
  pinMode(buttonPin1, INPUT_PULLUP);
  pinMode(buttonPin2, INPUT_PULLUP);
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Read button states
  bool b1 = (digitalRead(buttonPin1) == LOW); // pressed?
  bool b2 = (digitalRead(buttonPin2) == LOW);

  // Reset LEDs each loop
  digitalWrite(ledPin1, HIGH);
  digitalWrite(ledPin2, HIGH);

  if (b1) {
    Serial.println("0");
    digitalWrite(ledPin1, LOW);
    delay(200); // debounce & prevent spam
  }
  if (b2) {
    Serial.println("1");
    digitalWrite(ledPin2, LOW);
    delay(200);
  }
}

// void setup() {
//   Serial.begin(9600);
// }

// void loop() {
//   Serial.println(0);
//   delay(1000);
//   Serial.println(1);
//   delay(1000);

// }