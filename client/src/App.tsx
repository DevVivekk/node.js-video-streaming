const App = () => {
  return (
    <div style={{"display":"flex","alignItems":"center","flexDirection":"column"}}>
      <h1>Video Streaming Server!</h1>
      <video width={'480px'} height={'340px'} src="http://localhost:4000/video" controls />
    </div>
  )
}

export default App