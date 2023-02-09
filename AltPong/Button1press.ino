const int arcadeButton1 = 2; 
const int arcadeButton2 = 4;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(arcadeButton1, INPUT_PULLUP);
  pinMode(arcadeButton2, INPUT_PULLUP);
}

void loop() {
  // put your main code here, to run repeatedly:
  if (digitalRead(arcadeButton1) == HIGH) {
    Serial.println("BUTTONPRESSED");
  }  else if (digitalRead(arcadeButton2) == HIGH) {
    Serial.println("BUTTON2PRESSED");
  } else {
    Serial.println("BUTTONSDEACTIVATED");
  }


}
