import {
  HUNGER_MAX_LVL,
  MAX_MOVE_TIMEOUT_SEC,
  HUNGER_MIN_LVL,
  MIN_MOVE_TIMEOUT_SEC,
  STARVE_HUNGER_AMOUNT,
  STARVE_TIMEOUT_SEC,
  HUNGER_START_LVL,
  HAPPINESS_START_LVL,
  HAPPINESS_LOW_LVL,
  HUNGER_HIGH_LVL,
  HUNGER_LOW_LVL,
  HAPPINESS_MAX_LVL,
  HAPPINESS_MIN_LVL,
} from '../../constants';
import { CatBreed } from '../cat-breed';

export class Cat {
  public id: string | null;
  public name: string;
  public breed: CatBreed;
  public position: CatPosition;
  public movedTimes: number;
  public hunger: number;
  public ticksUntilAction: CatActionData;
  public happiness: number;
  public mood: CatMood;

  constructor(payload: Partial<Cat>) {
    const {
      id,
      name,
      breed,
      position,
      movedTimes,
      hunger,
      ticksUntilAction,
      happiness,
      mood,
    } = payload;

    this.id = id ?? null;
    this.name = name ?? '';
    this.breed = breed ?? this.getRandomBreed();
    this.position = position ?? CatPosition.Bed;
    this.movedTimes = movedTimes ?? 0;
    this.hunger = hunger ?? HUNGER_START_LVL;
    this.ticksUntilAction =
      ticksUntilAction ?? this.createCatActionDataStartObject();
    this.happiness = happiness ?? HAPPINESS_START_LVL;
    this.mood = mood ?? CatMood.Neutral;
  }

  public move(): void {
    this.position =
      this.position === CatPosition.Bed ? CatPosition.Box : CatPosition.Bed;

    this.movedTimes++;

    const ticksUntilMove = this.generateTicksUntilActionValue(CatAction.Move);

    this.setTicksUntilAction(CatAction.Move, ticksUntilMove);
  }

  public feed(): void {
    this.hunger = HUNGER_MIN_LVL;

    this.increaseHappiness();

    const ticksUntilStarve = STARVE_TIMEOUT_SEC;

    this.setTicksUntilAction(CatAction.Starve, ticksUntilStarve);
  }

  public starve(): void {
    if (this.hunger === HUNGER_MAX_LVL) {
      this.decreaseHappiness();
    } else {
      const updatedHunger = this.hunger + STARVE_HUNGER_AMOUNT;

      this.hunger = Math.min(updatedHunger, HUNGER_MAX_LVL);
    }

    const ticksUntilStarve = STARVE_TIMEOUT_SEC;

    this.setTicksUntilAction(CatAction.Starve, ticksUntilStarve);
  }

  public increaseHappiness(): void {
    this.happiness =
      this.happiness < HAPPINESS_MAX_LVL ? ++this.happiness : HAPPINESS_MAX_LVL;
  }

  public decreaseHappiness(): void {
    this.happiness =
      this.happiness > HAPPINESS_MIN_LVL ? --this.happiness : HAPPINESS_MIN_LVL;
  }

  public getTicksUntilAction(action: CatAction): number {
    return this.ticksUntilAction[action];
  }

  public setTicksUntilAction(action: CatAction, ticks: number): void {
    const updatedTicksUntilAction = { ...this.ticksUntilAction };
    updatedTicksUntilAction[action] = ticks;

    this.ticksUntilAction = updatedTicksUntilAction;
  }

  public updateCurrentMood(): void {
    this.mood = this.getCurrentMood();
  }

  private getCurrentMood(): CatMood {
    switch (true) {
      case this.hunger < HUNGER_LOW_LVL && this.happiness === HAPPINESS_MAX_LVL:
        return CatMood.Happy;
      case this.hunger < HUNGER_LOW_LVL:
        return CatMood.Full;
      case this.hunger === HUNGER_MAX_LVL && this.happiness < HAPPINESS_LOW_LVL:
        return CatMood.Starving;
      case this.hunger > HUNGER_HIGH_LVL:
        return CatMood.Hunger;
      case this.happiness < HAPPINESS_LOW_LVL:
        return CatMood.Anger;
      case this.happiness === HAPPINESS_MAX_LVL:
        return CatMood.Love;
      default:
        return CatMood.Neutral;
    }
  }

  private generateTicksUntilActionValue(action: CatAction): number {
    switch (action) {
      case CatAction.Move:
        return this.getRandomNumber(MIN_MOVE_TIMEOUT_SEC, MAX_MOVE_TIMEOUT_SEC);
      case CatAction.Starve:
        return STARVE_TIMEOUT_SEC;
      default:
        return 0;
    }
  }

  private getRandomBreed(): CatBreed {
    const breedValues = Object.values(CatBreed);

    return breedValues[Math.floor(Math.random() * breedValues.length)];
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private createCatActionDataStartObject(): CatActionData {
    return Object.values(CatAction).reduce((data: any, action: CatAction) => {
      return { ...data, [action]: this.generateTicksUntilActionValue(action) };
    }, {});
  }
}

export enum CatPosition {
  Bed = 'bed',
  Box = 'box',
}

export interface CatDeletePayload {
  id: string;
}

export const CatBreedMap = new Map<CatBreed, string>([
  [CatBreed.AmericanCurl, 'American curl'],
  [CatBreed.Birman, 'Birman'],
  [CatBreed.BlackRagdoll, 'Black Ragdoll'],
  [CatBreed.BritishLonghair, 'British Longhair'],
  [CatBreed.EgyptianMauCat, 'Egyptian Mau'],
  [CatBreed.ExoticShorthair, 'Exotic Shorthair'],
  [CatBreed.JapaneseBobtail, 'Japanese Bobtail'],
  [CatBreed.MaineCoon, 'Maine Coon'],
  [CatBreed.Munchkin, 'Munchkin'],
  [CatBreed.Persian, 'Persian'],
  [CatBreed.RussianBlue, 'Russian Blue'],
  [CatBreed.ScottishFold, 'Scottish Fold'],
  [CatBreed.SelkirkRexCat, 'Selkirk Rex'],
  [CatBreed.Siamese, 'Siamese'],
  [CatBreed.Siberian, 'Siberian'],
  [CatBreed.ScottishFold, 'Scottish Fold'],
  [CatBreed.Singapura, 'Singapure'],
  [CatBreed.TurkishAngora, 'Turkish Angora'],
]);

export enum CatAction {
  Move = 'move',
  Starve = 'starve',
}

export type CatActionData = Record<CatAction, number>;

export enum CatMood {
  Happy = 'happy',
  Love = 'love',
  Full = 'full',
  Hunger = 'hunger',
  Anger = 'anger',
  Starving = 'starving',
  Neutral = 'neutral',
}
