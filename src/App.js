import { useState, useEffect } from 'react'
import _map from 'lodash.map'
import Select from 'react-select'
import './App.scss';
import { getCountries, getRates } from './utils/api';

const selectTheme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#04C53A',
    primary: '#04C53A',
  },
})

const selectStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    borderBottom: '1px dotted pink',
    color: '#fff',
    backgroundColor: state.isFocused ? '#04C53A' : '#000',
    margin: '0 16px',
    padding: '8px 0',
    fontSize: 11,
  }),

  control: (provided, state) => ({
    fontSize: 11,
    display: 'flex',
    alignItems: 'center',
    height: 30,
    margin: '16px 16px 8px 16px',
    width: 'calc(100% - 32px)',
    border: `1px solid ${state.isFocused ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)'}`,
    borderRadius: 2
  }),
}

function App() {
  const [countries, setCountries] = useState([])
  const [rates, setRates] = useState([])
  const [base, setBase] = useState(1)
  const [from, setFrom] = useState('USD')

  useEffect(() => {
    async function fetchData() {
      const [countries, rates] = await Promise.all([getCountries(), getRates()])
      setCountries(countries)
      setRates(rates)
    }
    fetchData()
  }, [])

  const setValue = ({ target: { value } }) => {
    const reg = /^[0-9\b]+$/;

    if ((value === '' || reg.test(value)) && value.length < 10) {
      setBase(+value)
    }
  }

  const convert = (to) => {
    if (!base) return 0.00

    return (base * (rates[to] * 1 / rates[from])).toFixed(2)
  }

  const selectOptions = _map(countries, (key, value) => ({ value, label: key }))
  return (
    <div className="app">
      <div className="converter">
        <div className="header">
          <span>Currency converter</span>
        </div>
        <div className="content">
          <Select
            components={{
              IndicatorSeparator: () => null
            }}
            styles={selectStyles}
            isSearchable={false}
            theme={selectTheme}
            onChange={({ value }) => setFrom(value)} 
            options={selectOptions}
          />
          <input value={base} pattern="[0-9]*" onChange={setValue}/>
          <div className="rates">
            {_map(rates, (value, key) => (
              <div className="rate" key={key}>
                <span>{key}</span>
                <span>{convert(key)}</span>
              </div>
            ))}
          </div>
          </div>
      </div>
    </div>
  );
}

export default App;
