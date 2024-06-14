import { setSeederFactory } from 'typeorm-extension';
import { User } from '@models/user/user.entity';
import { Faker } from '@faker-js/faker';
import { generateHash } from '@snapSystem/helpers/helpers';

export const UserFactory = setSeederFactory(User, async (faker: Faker) => {
  const user = new User();
  user.firstName = faker.person.firstName();
  user.middleName = faker.person.middleName();
  user.lastName = faker.person.lastName();
  user.email = faker.internet.email();
  user.avatar = faker.internet.url();
  user.password = await generateHash('Password@12345');
  user.status = true;
  user.isLocked = false;

  return user;
});
