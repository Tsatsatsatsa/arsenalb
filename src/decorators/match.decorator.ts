import { registerDecorator} from 'class-validator';

export function Match(property: string) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'Match',
      target: object.constructor,
      propertyName,
      constraints: [property],
      validator: {
        validate(value: any, args: any) {
          return value === args.object[property];
        },
        defaultMessage(args: any) {
            return `${args.constraints[0]} must match ${args.property}`;
        }
      },
    });
  };
}
