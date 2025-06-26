export function getAge(birthDate: string): number {
    return new Date().getFullYear()
      - new Date(birthDate).getFullYear()
}