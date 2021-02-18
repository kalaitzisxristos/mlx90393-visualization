#include <Wire.h>

#include "Adafruit_MLX90393.h"

Adafruit_MLX90393 sensor = Adafruit_MLX90393();

void setup(void)
{
  digitalWrite(15, LOW);
  pinMode(15, OUTPUT);
  digitalWrite(15, LOW);
  
  Serial.begin(9600);

  /* Wait for serial on USB platforms. */
  while(!Serial) {
      delay(10);
  }

  Serial.println("Starting Adafruit MLX90393 Demo");

  if (sensor.begin())
  {
    Serial.println("Found a MLX90393 sensor");
  }
  else
  { 
    Serial.println("No sensor found ... check your wiring?");
    while (1);
  }

  sensor.setGain(MLX90393_GAIN_5X);
}

void loop(void)
{
    float x, y, z;

    if(sensor.readData(&x, &y, &z)) {
        Serial.print("{");
        Serial.print("\"X\":"); Serial.print((int)x); Serial.print(",");
        Serial.print("\"Y\":"); Serial.print((int)y); Serial.print(",");
        Serial.print("\"Z\":"); Serial.print((int)z); Serial.print("}");
        Serial.println("\r\n");
    } else {
        Serial.println("Unable to read XYZ data from the sensor.");

        pinMode(15, INPUT);
        delay(200);
        digitalWrite(15, LOW);
        pinMode(15, OUTPUT);
        digitalWrite(15, LOW);
    }

    delay(100);
}
