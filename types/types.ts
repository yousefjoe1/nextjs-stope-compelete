export type Inputs = {
    name: string;
    email: string;
    password: string;
    phone: string
  };
  
  export interface Group {
    name: string;
    groupType: string;
    adminPlayer: string;
    _id: string;
  }

  export interface GroupInputs {
    name: string;
    groupType: string;
  }
  
  
  export interface Answers  {
    _id: string;
    character:string;
    prophet: string;
    companionMale: string;
    companionFemale: string;
    surah: string;
    ayah: string;
    ghazwa: string;
    playerName: string;
  };