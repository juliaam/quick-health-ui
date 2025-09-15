export class GenderSexEnum {
  public static readonly enum = {
    female: 'female',
    male: 'male',
  } as const

  private static readonly label = {
    [this.enum.female]: 'Mulher',
    [this.enum.male]: 'Homem',
  } as const

  public static getLabel(
    value: (typeof GenderSexEnum.enum)[keyof typeof GenderSexEnum.enum]
  ) {
    return this.label[value]
  }
}
