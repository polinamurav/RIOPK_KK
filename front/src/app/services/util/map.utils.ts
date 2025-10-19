import { map } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs';

export const to = <TInitializer, TClass>(
  type: new (model: TInitializer) => TClass
): ((initializer: TInitializer) => TClass) => initializer => new type(initializer);

export const mapApiModelPipe = <TApiModel, TModel>(
  newAble: new (model: TApiModel) => TModel
): OperatorFunction<TApiModel, TModel> => map((model: TApiModel) => new newAble(model));

export const mapApiModelCollectionPipe = <TApiModel, TModel>(
  newAble: new (model: TApiModel) => TModel
): OperatorFunction<TApiModel[], TModel[]> =>
  map((modelCollection: TApiModel[]) => modelCollection.map(model => new newAble(model)));

export const mapApiModelCollection = <TApiModel, TModel>(
  collection: TApiModel[],
  newAble: new (model: TApiModel) => TModel
): TModel[] => collection.map(model => new newAble(model));
