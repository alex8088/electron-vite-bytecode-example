export const foo = 'foo2'

export const func = async (): Promise<void> => {
  // @ts-ignore cause crash for test
  undefined.crash()
}
