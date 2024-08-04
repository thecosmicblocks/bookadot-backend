import { Module, INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CategoryService } from 'src/modules/categories/category.service';
import { AppModule } from 'src/app.module';

@Module({
  imports: [AppModule],
})
class CommandModule {}

export const seedCategory = async () => {
  const app: INestApplicationContext =
    await NestFactory.createApplicationContext(CommandModule);
  const categoryService = app.get(CategoryService);

  const categoryData =
    await require('src/common/data-template/categories.json');
  const params = [];
  for (let i = 0; i < categoryData.length; i++) {
    params.push({
      name: categoryData[i].name,
    });
  }

  try {
    await categoryService.truncate();
    await categoryService.create(params);
  } catch (error) {
    console.log('Seed movies fail!', error);
  }
  await app.close();
  process.exit(0);
};

seedCategory();
