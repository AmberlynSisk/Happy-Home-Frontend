import Typewriter from 'typewriter-effect';

const TypeWrite = () => {
  return (
    <>
        <Typewriter
            options={{
            strings: ['appointments.', 'chores.', 'events.', 'to-dos.'],
            autoStart: true,
            loop: true,
            skipAddStyles: true,
            }}
        />
    </>
  )
}

export default TypeWrite