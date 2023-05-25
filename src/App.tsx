import { useState, ChangeEvent, MouseEvent, ChangeEventHandler } from "react";
import "./App.css";
import quicktypeJSON from "./Quicktype";
import Popup from "./Popup/Popup";

function App() {
  //const test = '{"name":"Nirvana","founded":1987,"members":["Kurt Kobain","Dave Grohl","Krist Novoselic"]}'
  const test = ''
  const lang = 'TypeScript';

  const [input_value, setInput] = useState(test);
  const [output_area, setOutput] = useState('');
  const [popup, setPopup] = useState(false);
  const [enum_value, setEnum] = useState(true);
  const [interface_value, setInterface] = useState(true);
  const [similarclasses_value, setSimilarclasses] = useState(false);

  const inputChangeHandler = (event:ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value)
  };

  const footerConvertHandler = (event: MouseEvent) =>{
    event.preventDefault();
    
    console.log(input_value);
    let raw = quicktypeJSON(lang, 'Thing', input_value, enum_value, similarclasses_value)
    .then(result => {
        
        const borders: number[] = []
        
        for(let i=0; i<result.lines.length; i++)
        {
          if (borders.length == 0)
          {
            if(result.lines[i] == "")
            {
              borders.push(i)
            }
          }
          else
          {
            if (result.lines[borders[borders.length - 1] + 1].includes("//") && borders.length != 0)
            {
              console.log(i)
              console.log(borders)
              break
            }
            else
            {
              if(result.lines[i] == "")
              {
                borders.push(i)
              }
            }
          }
        }

        var result_string = ""

        for (let i=borders[0]+1; i < borders[borders.length-1]; i++)
        {
          result_string += result.lines[i] + '\n'
        }

        setOutput(result_string);
    })
    .catch(err => {
      setPopup(true);
      console.log('error');
      alert(err);
      return <Popup open={popup} error={err} onClose={()=>setPopup(false)} />
    });   
  };

  const footerParmsHandler = (event: MouseEvent) => {
    console.log('да, эта кнопка ничего не делает')
  };

  const bebebe = (event: ChangeEvent) => {
    setEnum(!enum_value);
    console.log(enum_value);
  };

  return (
    <div className="App">
      <header>
        <div className="Logo">
          <div className="Title">Конвертер</div>
          <div className="RedStripe"></div>
        </div>
      </header>
      <main>
        <div className="LeftSide">
          <div className="Content">
            <div className="Input Block">
              <div className="Container">
                <div className="Header">
                  <span className="Text">из</span>
                  <select id="FromTypes">
                    <option value="JSON" selected>
                      JSON
                    </option>
                    <option value="Another">
                      Another
                    </option>
                  </select>
                </div>
                <div className="Body">
                  <textarea className="TextArea" name="in" id="in" autoComplete="on" autoFocus value={input_value} onChange={inputChangeHandler} placeholder="Вставьте содержимое файла json или прикрепите файл"/>
                </div>
              </div>
            </div>
            <div className={`BetweenStripe ${Boolean(input_value)?"Active":""}`}>
              <div className="FirstStripe"></div>
              <div className="Arrow"></div>
              <div className="SecondStripe"></div>
            </div>
            <div className="Output Block">
              <div className="Container">
                <div className="Header">
                  <span className="Text">в</span>
                  <select id="ToTypes">
                    <option value="JSON" selected>
                      TypeScript
                    </option>
                    <option value="Another">
                      Another
                    </option>
                  </select>
                  <button className="Download Button" disabled={!Boolean(output_area)}>
                    <div className="Icon"></div>
                    <span className="Title">Скачать</span>
                  </button>
                  <button className="Copy Button" disabled={!Boolean(output_area)}>
                    <div className="Icon"></div>
                    <span className="Title">Скопировать</span>
                  </button>
                </div>
                <div className="Body">
                  <textarea className="TextArea" name="out" id="output" autoComplete="on" readOnly value={output_area} placeholder="После конвертации вы увидите здесь результат"/>
                </div>
              </div>
            </div>
          </div>
          <div className="Footer">
            <button className="Convert Button Inactive" onClick={footerConvertHandler} disabled={!Boolean(input_value)}>Конвертировать</button>
          </div>
        </div>
        <div className="RightSide">
          <div className="Content">
            <div className="Container">
              <div className="Header">
                Параметры конвертации
              </div>
              <div className="Body">
                <div className="RadioButtonGroup">
                  <div className="RadioButton">
                    <input type="radio" name="union" id="enum" onChange={()=>{setEnum(!enum_value)}} />
                    <label htmlFor="enum">Enum</label>
                  </div>
                  <div className="RadioButton">
                    <input type="radio" name="union" id="union" onChange={()=>{setEnum(!enum_value)}} />
                    <label htmlFor="union">Union</label>
                  </div>
                </div>
                <div className="RadioButtonGroup">
                  <div className="RadioButton">
                    <input type="radio" name="type" id="type" onChange={()=>{setInterface(!interface_value)}} />
                    <label htmlFor="type">Type</label>
                  </div> 
                  <div className="RadioButton">
                    <input type="radio" name="type" id="interface" onChange={()=>{setInterface(!interface_value)}} />
                    <label htmlFor="interface">Interface</label>
                  </div>
                </div>
                <input type="checkbox" name="classes" id="classes" onClick={()=>{setSimilarclasses(!similarclasses_value)}}/>
                <label htmlFor="classes">Обобщить похожие классы</label>
                {/* <button onClick={()=>setPopup(true)}>Ошибка</button> */}
                {/* <Popup open={setPopup} /> */}
              </div>
            </div>
          </div>
          <div className="Footer">
            <button className="Apply Button" onClick={footerParmsHandler}>Применить</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;