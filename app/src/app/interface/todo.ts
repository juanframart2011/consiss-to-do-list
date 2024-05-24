export interface Todo {
    _id?: string;
    title: string;
    subtitle: string;
    description: string;
    statu: number; // 1 es abierto, 2 en proceso, 3 terminado
    createdAt?: Date;
    updatedAt?: Date;
}  