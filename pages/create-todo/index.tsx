import { useState } from "react";
import { useCallback } from "react";
import { FormEvent } from "react";
import { Header } from "../../components";

const CreateTodo = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleTitleChange = useCallback((e: FormEvent) => {
    setTitle((e.target as HTMLInputElement).value);
  }, []);

  const handleDescriptionChange = useCallback((e: FormEvent) => {
    setDescription((e.target as HTMLInputElement).value);
  }, []);

  return (
    <>
      <Header />
      <main className="flex h-full w-full items-center justify-center p-16 pt-40 ">
        <div className="w-[500px] min-w-max rounded-md bg-slate-800 p-4 text-center shadow-md shadow-gray-900">
          <span>Todo</span>
          <form className="w-full p-4" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-2">
              <label className="mb-2 block w-full text-left text-sm font-bold">
                Title
              </label>
              <input
                type="text"
                className="w-full p-4 text-black focus:outline-none"
                placeholder="eg. Todo 1"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <label className="mb-2 block w-full text-left text-sm font-bold">
                Description
              </label>
              <textarea
                className="w-full p-4 text-black focus:outline-none"
                placeholder="add some description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <button
                type="submit"
                className="max-w-max bg-green-500 p-2 focus:outline-none"
              >
                Add Todo
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateTodo;
