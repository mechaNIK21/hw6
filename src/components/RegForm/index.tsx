import classnames from "classnames";
import React from "react";
const style = require("./style.module.scss");

type RegFormType = {
  key: string;
  value: string;
  text: string;
  type: string;
  setValue: any;
}[];
type PaymentMethod = {
  key: string;
  type: string;
  text: string;
  isChecked: boolean;
}[];

const Registration = () => {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [adress, setAdress] = React.useState("");
  const [payMethod, setPayMethod] = React.useState("cash");
  const [agreeWithPolicy, setAgreeWithPolicy] = React.useState(false);
  const regFormType: RegFormType = [
    {
      key: "name",
      value: name,
      text: "Name",
      type: "text",
      setValue: setName
    },
    {
      key: "phone",
      value: phone,
      text: "Phone",
      type: "phone",
      setValue: setPhone
    }
  ];
  const paymentMethod: PaymentMethod = [
    {
      key: "cash",
      type: "radio",
      text: "Cash",
      isChecked: payMethod === "cash"
    },
    {
      key: "card",
      type: "radio",
      text: "Card",
      isChecked: payMethod === "card"
    },
    {
      key: "checkbook",
      type: "radio",
      text: "Checkbook",
      isChecked: payMethod === "checkbook"
    }
  ];

  const orderFormSubmin = (e: React.FormEvent<HTMLFormElement>) => {
    const arrForError = [];
    if (name.trim().length === 0) arrForError.push("Неверное имя");
    if (phone.trim().length === 0) arrForError.push("Неверный номер");
    if (adress.trim().length === 0) arrForError.push("Неверный адрес");
    if (!agreeWithPolicy) arrForError.push("Не согласны с политикой");

    if (arrForError.length > 0) {
      alert("Заполните все поля для ввода");
    } else {
      alert("Подтверждено");
      setName("");
      setPhone("");
      setAdress("");
      setPayMethod("cash");
      setAgreeWithPolicy(false);
    }
    e.preventDefault();
  };

  return (
    <form
      id="form"
      className={style.regForm}
      onSubmit={orderFormSubmin}
      action=""
    >
      {regFormType.map(({ key, value, text, type, setValue }) => (
        <div
          key={key}
          className={classnames(style.inputForm, style.labelForForm)}
        >
          <label htmlFor={key}>{text}: </label>
          <input
            id={key}
            type={type}
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </div>
      ))}
      <div className={style.inputForm}>
        <textarea
          value={adress}
          onChange={e => setAdress(e.target.value)}
          placeholder="Adress"
        ></textarea>
      </div>
      <div className={style.inputForm}>
        {paymentMethod.map(({ key, type, text, isChecked }) => (
          <label key={key} htmlFor={key}>
            <input
              id={key}
              type={type}
              value={key}
              checked={isChecked}
              onChange={e => setPayMethod(key)}
            />
            {text}
          </label>
        ))}
      </div>
      <div className={style.inputForm}>
        <label>
          <input
            type="checkbox"
            id="policy"
            checked={agreeWithPolicy}
            onChange={() => setAgreeWithPolicy(!agreeWithPolicy)}
          />
          Agree whith the policy
        </label>
      </div>
      <div className={classnames(style.inputForm, style.buttonHolder)}>
        <button type="submit">Order</button>
      </div>
    </form>
  );
};

export default React.memo(Registration);
