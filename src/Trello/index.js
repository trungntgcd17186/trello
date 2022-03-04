import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState, useRef } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import {
  editTodo,
  getTodoFollowId,
  getTodos,
  getTodosCompleted,
  getUsers,
  onDropEditTodo,
} from "../api/index";
import ModalChangeBackground from "../Components/ModalChangeBackground";
import ModalEditTodos from "../Components/ModalEditTodos";
import TaskCard from "../Components/TaskCard";
import "./style.css";
import yup from "./Validate/yupGlobal";

function Trello(props) {
  const [datas, setDatas] = useState([]);
  const [datasCompleted, setDatasCompleted] = useState([]);

  const [dataUsers, setDataUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  //Set state loadmore
  const [loadMoreTodo, setLoadMoreTodo] = useState(1);
  const [loadMoreCompleted, setLoadMoreCompleted] = useState(1);

  //Xử lý show modal
  const handleShow = (e) => {
    setShow(true);
    setId(e.id);
  };
  const handleClose = () => setShow(false);

  const fetchDataTodos = async () => {
    const response = await getTodos(loadMoreTodo);
    setDatas(response.data);
  };
  const fetchDataTodosCompleted = async () => {
    const response = await getTodosCompleted(loadMoreCompleted);
    setDatasCompleted(response.data);
  };

  const fetchDataUsers = async () => {
    const response = await getUsers();
    setDataUsers(response.data);
  };

  useEffect(() => {
    fetchDataTodos();
    fetchDataTodosCompleted();
    fetchDataUsers();
  }, []);

  const fetchTodoFollowId = async () => {
    const response = await getTodoFollowId(id);
    reset(response.data);
  };
  //Lấy dữ liệu theo id button
  useEffect(() => {
    fetchTodoFollowId();
  }, [id]);

  //Xử lý validate input
  const schema = yup.object().shape({
    title: yup.string().required("Vui lòng nhập title"),
    assignee: yup.string().required("Vui lòng nhập user!"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onError = (errors, e) => console.log(errors, e);

  const onOrderSubmit = (data) => {
    EditData({
      ...data,
    });
  };

  //Xử lý Edit api
  const EditData = async (data) => {
    await editTodo(id, data).then((res) => {
      const newDatas = datas.map((task) => {
        if (task.id === res.data.id) {
          return res.data;
        }
        return task;
      });
      setDatas(newDatas);
      const newDatasCompleted = datasCompleted.map((task) => {
        if (task.id === res.data.id) {
          return res.data;
        }
        return task;
      });
      setDatasCompleted(newDatasCompleted);
    });
  };

  const todosRef = useRef();
  const todoCompletedRef = useRef();

  //Xử lý cột và lưu vị trí drag drop
  const columnsData = {
    ["column1"]: {
      title: "To-do",
      items: datas,
      ref: todosRef,
    },
    ["column2"]: {
      title: "Completed",
      items: datasCompleted,
      ref: todoCompletedRef,
    },
  };

  const [columns, setColumns] = useState(columnsData);

  //Re-render để lấy giá trị columnsData gán vào columns
  useEffect(() => {
    setColumns(columnsData);
  }, [datas, datasCompleted]);

  const onDragEnd = async (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];

      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });

      const response = await getTodoFollowId(result.draggableId);

      if (
        response.data.completed === true ||
        response.data.completed === "true"
      ) {
        const dataComplete = datasCompleted[result.draggableId - 1].completed;
        const saveDatas = datasCompleted[result.draggableId - 1];
        onDropEditTodo(result.draggableId, saveDatas, dataComplete);
      }
      if (
        response.data.completed === false ||
        response.data.completed === "false"
      ) {
        const dataComplete = datas[result.draggableId - 1].completed;
        const saveDatas = datas[result.draggableId - 1];
        onDropEditTodo(result.draggableId, saveDatas, dataComplete);
      }
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const handleScroll = async (titleColumn) => {
    if (todosRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = todosRef.current;

      if (scrollTop + clientHeight > scrollHeight - 1) {
        if (titleColumn === "To-do") {
          setLoadMoreTodo(loadMoreTodo + 1);
          const response = await getTodos(loadMoreTodo + 1);
          const newTodos = [...datas, ...response.data];
          setDatas(newTodos);
        }
      }
    }
    if (todoCompletedRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        todoCompletedRef.current;
      if (scrollTop + clientHeight > scrollHeight - 1) {
        if (titleColumn === "Completed") {
          setLoadMoreCompleted(loadMoreCompleted + 1);
          const response = await getTodosCompleted(loadMoreCompleted + 1);
          const newTodosCompleted = [...datasCompleted, ...response.data];
          setDatasCompleted(newTodosCompleted);
        }
      }
    }
  };

  return (
    <div className="main">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className="container" key={index}>
              <div className="column-wrapper">
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided) => (
                    <div
                      className={"task-list" + index}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <div className="title">{column.title}</div>
                      <div
                        className="scroll"
                        onScroll={() => handleScroll(column.title)}
                        ref={column.ref}
                      >
                        {column.items.map((item, index) => (
                          <TaskCard
                            key={index}
                            item={item}
                            index={index}
                            handleShow={handleShow}
                          />
                        ))}
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          );
        })}

        <div>
          <ModalChangeBackground
            setBackground={props.setBackground}
            background={props.background}
          />
        </div>
      </DragDropContext>

      <div>
        <ModalEditTodos
          handleClose={handleClose}
          show={show}
          onOrderSubmit={onOrderSubmit}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          onError={onError}
          reset={reset}
          dataUsers={dataUsers}
        />
      </div>
    </div>
  );
}

export default Trello;
