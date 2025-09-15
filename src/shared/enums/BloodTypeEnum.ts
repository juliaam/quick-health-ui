export class BloodTypeEnum {
  public static readonly enum = {
    'A+': 'A+',
    'A-': 'A-',
    'B+': 'B+',
    'B-': 'B-',
    'AB+': 'AB+',
    'AB-': 'AB-',
    'O+': 'O+',
    'O-': 'O-',
  } as const

  private static readonly label = {
    [this.enum['A+']]: 'A+',
    [this.enum['A-']]: 'A-',
    [this.enum['B+']]: 'B+',
    [this.enum['B-']]: 'B-',
    [this.enum['AB+']]: 'AB+',
    [this.enum['AB-']]: 'AB-',
    [this.enum['O+']]: 'O+',
    [this.enum['O-']]: 'O-',
  } as const

  public static getLabel(
    value: (typeof BloodTypeEnum.enum)[keyof typeof BloodTypeEnum.enum]
  ) {
    return this.label[value]
  }
}
