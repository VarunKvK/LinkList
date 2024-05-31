import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RadioTogglers({ options, defaultValue, onChange }) {
  return (
    <div className="radio-togglers">
      {options.map((option,index)=> {
        return(<label key={index}>
        <input type="radio" name="bgType" onClick={ev=>onChange(ev.target.value)} value={option.value} defaultChecked={defaultValue==option.value}/>
        <div className="">
          <FontAwesomeIcon icon={option.icon} />
          <span>{option.label}</span>
        </div>
      </label>)
      })}
    </div>
  );
}
