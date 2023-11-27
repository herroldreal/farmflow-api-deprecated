import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { firestore } from 'firebase-admin';
import { REQUEST } from '@nestjs/core';
import { Todo } from './entities/todo.entity';
import DocumentSnapshot = firestore.DocumentSnapshot;
import QuerySnapshot = firestore.QuerySnapshot;
import DocumentData = firestore.DocumentData;

@Injectable()
export class TodoService {
  private collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(@Inject(REQUEST) private readonly request: { user: any }) {
    this.collection = firestore().collection('todos');
  }

  async create(createTodoDto: CreateTodoDto) {
    const userId: string = this.request.user.uid as string;
    const todo: Omit<Todo, 'id'> = {
      ...createTodoDto,
      createdAt: new Date().toISOString(),
      userId,
    };

    return this.collection.add(todo).then((document) => {
      return { id: document.id, ...todo };
    });
  }

  findAll() {
    return this.collection
      .where('userId', '==', this.request.user.uid)
      .get()
      .then((querySnapshot: QuerySnapshot<DocumentData>) => {
        if (querySnapshot.empty) {
          return [];
        }

        const todos: Todo[] = [];
        for (const document of querySnapshot.docs) {
          todos.push(this.transformTodo(document));
        }

        return todos;
      });
  }

  findOne(id: string) {
    return this.collection
      .doc(id)
      .get()
      .then((querySnapshot: DocumentSnapshot<Todo>) => {
        return this.transformTodo(querySnapshot);
      });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    await this.collection.doc(id).update(updateTodoDto);
  }

  async remove(id: string) {
    await this.collection.doc(id).delete();
  }

  private transformTodo(querySnapshot: QuerySnapshot<DocumentData>) {
    if (!querySnapshot.empty) {
      throw new Error(`no todo found with the given id`);
    }

    const data = querySnapshot.docs;
    const userId: string = this.request.user.uid as string;

    data.forEach((todo => {
      if (todo.data().userId !== userId) {
        throw new Error(`no todo found with the given id`);
      }
    }));

    return {
      id: querySnapshot.id,
      ...todo,
    };
  }
}
