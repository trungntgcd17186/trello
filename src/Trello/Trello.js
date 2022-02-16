import React, { useEffect, useState, useRef } from "react";
import UpdateTodos from "../Components/UpdateTodos/UpdateTodos";
import ChangeBackground from "../Components/ChangeBackground/ChangeBackground";
import "./style.css";

import axios from "axios";
import { useForm } from "react-hook-form";
import yup from "../Components/Validate/yupGlobal";

import { yupResolver } from "@hookform/resolvers/yup";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import TaskCard from "./TaskCard";
import { Scrollbars } from "react-custom-scrollbars";
function Trello(props) {
  const [datas, setDatas] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);

  const [show, setShow] = useState(false);
  const [getDataById, setGetDataById] = useState("");
  const [edit, setEdit] = useState(false);
  //Xử lý show modal
  const handleShow = (e) => {
    setShow(true);
    setGetDataById(e.id);
  };
  const handleClose = () => setShow(false);

  // Xử lý get data api todos list
  useEffect(() => {
    axios.get("http://localhost:3001/todos").then((response) => {
      setDatas(response.data);
    });
  }, [edit]);

  //Lấy dữ liệu theo id button
  useEffect(() => {
    axios.get(`http://localhost:3001/todos/${getDataById}`).then((response) => {
      reset(response.data);
    });
  }, [getDataById]);

  console.log(getDataById);
  //Xử lý get data api users
  useEffect(() => {
    axios.get("http://localhost:3001/users").then((response) => {
      setDataUsers(response.data);
    });
  }, []);

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
    await axios.put(`http://localhost:3001/todos/${getDataById}`, data);
    setEdit(!edit);
  };

  //Xử lý cột và lưu vị trí drag drop
  const columnsData = {
    ["column1"]: {
      title: "To-do",
      items: datas.filter(
        (task) => task.completed === false || task.completed === "false"
      ),
    },
    ["column2"]: {
      title: "Completed",
      items: datas.filter(
        (task) => task.completed === true || task.completed === "true"
      ),
    },
  };

  const [columns, setColumns] = useState(columnsData);

  //Re-render để lấy giá trị columnsData gán vào columns
  useEffect(() => {
    setColumns(columnsData);
  }, [datas]);

  const onDragEnd = (result, columns, setColumns) => {
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

      //Xử lý chức năng thay đổi status completed (true <-> false) sau khi drop.
      axios
        .get(`http://localhost:3001/todos/${result.draggableId}`)
        .then((response) => {
          const data = response.data;
          const dataComplete = response.data.completed;
          axios.put(`http://localhost:3001/todos/${result.draggableId}`, {
            ...data,
            completed: !dataComplete,
          });
        });
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

  return (
    <div className="main">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <div className="container">
          <div className="task-column">
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided, snapshot) => (
                    <div
                      className="task-list"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <div className="title">{column.title}</div>
                      <Scrollbars style={{ width: 250, height: 1000 }}>
                        {column.items.map((item, index) => (
                          <TaskCard
                            key={index}
                            item={item}
                            index={index}
                            handleShow={handleShow}
                          />
                        ))}
                        {provided.placeholder}
                      </Scrollbars>
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </div>
        <div>
          <ChangeBackground />
        </div>
      </DragDropContext>

      <div>
        <UpdateTodos
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
