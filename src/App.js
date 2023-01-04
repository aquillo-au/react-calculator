import './App.css';
import Wrapper from "./components/Wrapper";
import Welcome from "./components/Welcome";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import Theme from "./components/Theme";
import ThemeSlider from "./components/ThemeSlider";
import React, { useState } from "react";

const themeStyles = [ 'standard', 'dark', 'light']
const buttonValues = [
  ['7','8','9','del'],
  ['4','5','6','+'],
  ['1','2','3','-'],
  ['.','0','/','X'],
  ['RESET', '='],
];
const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: '0',
    res: '0',
    style: 'standard',
  });
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (calc.num.length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === '0' && value === "0" ? "0"
          : calc.num === '0' ? value
          : calc.num + value,
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };
  const decimalClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };
  const math = (a, b, sign) =>
  sign === "+" ? a + b
    : sign === "-" ? a - b
    : sign === "X" ? a * b
    : a / b;

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: calc.num === '0' && calc.sign === "/" ? "Can't divide with 0"
        : calc.num && calc.res ? math(Number(calc.res), Number(calc.num), calc.sign)
        : calc.res = calc.num,
      num: '0',
    });
  };
  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      setCalc({
        ...calc,
        res:
          calc.num === '0' && calc.sign === "/"
            ? "Can't divide with 0"
            : math(Number(calc.res), Number(calc.num), calc.sign),
        sign: "",
        num: 0,
      });
    }
  };
  const deleteClickHandler = () => {
    setCalc({
      ...calc,
      num:
        calc.num === '0' ? "0"
        : calc.num.slice(0, -1)
    });
  }
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: '0',
    });
  };
  const darkMode = () => {
    setCalc({
      ...calc,
      style: 'dark',
    });
  };
  const lightMode = () => {
    setCalc({
      ...calc,
      style: 'light',
    });
  };
  const standardMode = () => {
    setCalc({
      ...calc,
      style: 'standard',
    });
  };
  return (
    <div className={calc.style} >
      <Welcome text ={calc.style}/>
      <ThemeSlider>
        {
          themeStyles.map((theme, i) => {
            return (
              <Theme
                key={i}
                value={i+1}
                themeClick={
                  theme === "standard" ? standardMode
                    : theme === "dark" ? darkMode
                    : lightMode
                }
                />
            );
          })
        }
      </ThemeSlider>
      <Wrapper>
        <Screen value={calc.num ? calc.num : calc.res} />
        <ButtonBox>
          {
            buttonValues.flat().map((btn, i) => {
              return (
                <Button
                  key={i}
                  className={btn === ("=") ? "equals"
                  : btn === ("RESET") ? "reset"
                  : "btn"}
                  value={btn}
                  onClick={
                    btn === "RESET" ? resetClickHandler
                      : btn === "=" ? equalsClickHandler
                      : btn === "/" || btn === "X" || btn === "-" || btn === "+" ? signClickHandler
                      : btn === "." ? decimalClickHandler
                      : btn === "del" ? deleteClickHandler
                      : numClickHandler
                  }
                />
              );
            })
          }
        </ButtonBox>
      </Wrapper>
    </div>
  );
};

export default App;
