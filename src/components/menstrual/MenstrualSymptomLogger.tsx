
import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type MenstrualSymptomLoggerProps = {
  selectedDate: Date | undefined;
  onLogSymptom: (symptom: string) => void;
};

const commonSymptoms = [
  "Cramps", "Headache", "Bloating", "Fatigue", 
  "Mood Swings", "Breast Tenderness", "Acne", "Backache",
  "Nausea", "Food Cravings", "Insomnia", "Dizziness"
];

const MenstrualSymptomLogger = ({ selectedDate, onLogSymptom }: MenstrualSymptomLoggerProps) => {
  const [customSymptom, setCustomSymptom] = useState("");
  const [notes, setNotes] = useState("");

  const handleAddCustomSymptom = () => {
    if (customSymptom.trim()) {
      onLogSymptom(customSymptom.trim());
      setCustomSymptom("");
    }
  };

  const saveNotes = () => {
    // This would typically save to your cycle data
    // For now, we'll just show that it was recorded
    if (notes.trim()) {
      onLogSymptom("Notes added: " + notes.substring(0, 20) + (notes.length > 20 ? "..." : ""));
      setNotes("");
    }
  };

  if (!selectedDate) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-wellness-gray">Please select a date to log symptoms</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Symptoms for {format(selectedDate, "MMMM d, yyyy")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-md font-medium mb-3">Common Symptoms</h3>
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map((symptom) => (
              <Button
                key={symptom}
                variant="outline"
                size="sm"
                onClick={() => onLogSymptom(symptom)}
                className="bg-wellness-light hover:bg-wellness-primary hover:text-white transition-colors"
              >
                {symptom}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-md font-medium mb-3">Custom Symptom</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={customSymptom}
              onChange={(e) => setCustomSymptom(e.target.value)}
              placeholder="Enter custom symptom"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button onClick={handleAddCustomSymptom}>Add</Button>
          </div>
        </div>

        <div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="notes">Notes for this day</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes about how you're feeling today..."
              className="min-h-[100px]"
            />
          </div>
          <Button className="mt-3" onClick={saveNotes}>Save Notes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenstrualSymptomLogger;
