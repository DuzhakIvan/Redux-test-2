
const Spinner = () => { // Создаем копонент спинера

    // .spinner-border {
    //     display: inline-block;
    //     width: 2rem;
    //     height: 2rem;
    //     vertical-align: text-bottom;
    //     border: 0.25em solid currentColor;
    //     border-right-color: transparent;
    //     border-radius: 50%;
    //     animation: spinner-border 0.75s linear infinite;
    //   }
      
    //   .mx-auto {
    //     margin-left: auto;
    //     margin-right: auto;
    //   }
      
    //   .mt-5 {
    //     margin-top: 5rem;
    //   }

    return (
        <div className="spinner-border mx-auto mt-5" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default Spinner;