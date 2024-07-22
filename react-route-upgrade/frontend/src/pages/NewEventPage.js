// import { useNavigate } from "react-router-dom";
import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm/js";

function NewEventPage() {
  // useNavigate();
  // function submitHandler(event) {
  //   event.preventDefault();
  // }
  return <EventForm />;
}

export default NewEventPage;

// 리액트 라우터에 의해 실행된 action에는 유용한 프로퍼티들이 포함된 객체를 받는다.
export async function action({ request, params }) {
  // formData를 활용하기 위해 formData 메서드를 사용
  const data = await request.formData();

  // const enteredTitle = data.get('title')

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  const response = fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }

  return redirect("/events");
}
