export default function DataList(props) {
  const { word } = props;
  const { wordValue, synonyms } = word;
  const senses = Object.keys(synonyms);
  console.log({ props })

  function renderBySense(sense) {
    return (
      <div key={sense}>
        <h3>{sense}</h3>
        {synonyms[sense].map((data) => (
          <li key={data}>
            {data}
          </li>
        ))}
      </div>
    )
  }

  return (
    <div>
      <h1>Resultados para {wordValue.toUpperCase()}:</h1>
      {senses.map(sense => (
        renderBySense(sense)
      ))}
    </div>
  )
}
