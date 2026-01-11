export type Person = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type CreatePerson = Pick<Person, 'name' | 'email'>;
export type UpdatePerson = Partial<CreatePerson>;
