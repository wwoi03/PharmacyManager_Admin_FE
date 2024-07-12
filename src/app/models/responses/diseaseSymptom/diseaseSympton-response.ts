export class DiseaseSymptomResponse{
    symptomId: string;
    symptom: Symptom;
    diseaseId: string;
    disease: Disease;
}

export class Symptom{
    id: string;
    name: string;
    description?: string; 
    codeSymptom: string;
}

export class Disease{
    id: string;
    name: string;
    description?: string; 
    codeDisease: string;
}