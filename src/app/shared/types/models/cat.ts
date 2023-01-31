import { v5 as uuid } from 'uuid';
import { CatBreed } from '../cat-breed';

export class Cat {
  public id: string;
  public name: string;
  public breed: CatBreed;
  public position: CatPosition;

  constructor(payload: CatCreatePayload) {
    const { id, name, breed, position } = payload;

    this.name = name ?? '';
    this.id = id ?? uuid(this.name + Date.now().toString(), uuid.DNS);
    this.breed = breed ?? this.getRandomBreed();
    this.position = position ?? CatPosition.Bed;
  }

  public updatePosition(): void {
    this.position =
      this.position === CatPosition.Bed ? CatPosition.Box : CatPosition.Bed;
  }

  private getRandomBreed(): CatBreed {
    const breedValues = Object.values(CatBreed);

    return breedValues[Math.floor(Math.random() * breedValues.length)];
  }
}

export enum CatPosition {
  Bed = 'bed',
  Box = 'box',
}

export interface CatCreatePayload {
  id?: string;
  name?: string;
  breed?: CatBreed;
  position?: CatPosition;
}

export interface CatDeletePayload {
  id: string;
}

export const CatBreedMap = new Map<CatBreed, string>([
  [CatBreed.AmericanCurl, 'American curl'],
  [CatBreed.BlackRagdoll, 'Black Ragdoll'],
  [CatBreed.EgyptianMauCat, 'Egyptian Mau'],
  [CatBreed.ExoticShorthair, 'Exotic Shorthair'],
  [CatBreed.JapaneseBobtail, 'Japanese Bobtail'],
  [CatBreed.MaineCoon, 'Maine Coon'],
  [CatBreed.Persian, 'Persian'],
  [CatBreed.ScottishFold, 'Scottish Fold'],
  [CatBreed.SelkirkRexCat, 'Selkirk Rex'],
  [CatBreed.Siamese, 'Siamese'],
  [CatBreed.Singapure, 'Singapure'],
  [CatBreed.TurkishAngora, 'Turkish Angora'],
]);
