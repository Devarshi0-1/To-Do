window.onload = () => {
    const loader = document.querySelector('.loader')
    const date = document.querySelector('#date')    
    const taskAreaAll = document.querySelector('#taskAreaAll')
    const mainText = document.querySelector('#mainText')
    const addButton = document.querySelector('#addButton');
    const mainWorkingArea = document.querySelector('#mainWorkingArea')

    loader.classList.add('loaderOnLoad')
    date.classList.add('dateAnimation')
    mainWorkingArea.classList.add('mainWorkingAreaAnimation')

    new Sortable(taskAreaAll, { animation: 200 });

    myFunctions.displayDate(date)

    setInterval(() => {
        myFunctions.displayDate(date)
    }, 1000);

    mainText.addEventListener("keyup", function (e) {
        if (e.code === 'Enter') {
            addButton.click();
        }
    });

    mainText.addEventListener('blur', () => {
        if (mainText.value != '')
            mainText.focus()
    })

    addButton.addEventListener("click", () => {
        addTaskValue = mainText.value

        if (!(addTaskValue.trim().length === 0)) {

            const text_Area = myFunctions.crtElements('li', ['tasksArea'], taskAreaAll)
            const customChk = myFunctions.crtElementsWithAttributes('span', ['customCheckBox'], 'data-buttonType', 'notChecked', text_Area)
            const txt = myFunctions.crtElements('input', ['tasks'], text_Area)
            txt.setAttribute('readonly', true)
            const edtDlt_Btns = myFunctions.crtElements('div', ['edtDltBtns'], text_Area)
            const edt = myFunctions.crtElementsWithAttributes('i', ['edit', 'fa-solid', 'fa-pen-to-square'], 'data-buttonType', 'edit', edtDlt_Btns)
            const dlt = myFunctions.crtElements('i', ['delete', 'fa-solid', 'fa-trash'], edtDlt_Btns)

            const dateNow = new Date();
            const current_Time = myFunctions.crtElements('input', ['currentTime'], text_Area)
            current_Time.setAttribute('readonly', true)
            current_Time.value = `${dateNow.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}`

            txt.value = addTaskValue
            mainText.value = ""

            txt.addEventListener("keyup", function (e) {
                if (e.code === 'Enter') {
                    edt.click();
                }
            });

            edt.addEventListener('click', () => {

                if (edt.getAttribute('data-buttonType') === 'edit') {
                    txt.removeAttribute("readonly")
                    edt.classList.remove('fa-pen-to-square')
                    edt.classList.add('fa-floppy-disk')
                    edt.setAttribute("data-buttonType", "save")
                    txt.style.cursor = 'auto'
                }

                else {
                    if (!(txt.value.trim().length === 0)) {
                        txt.setAttribute('readonly', true)
                        edt.setAttribute("data-buttonType", "edit")
                        edt.classList.add('fa-pen-to-square')
                        txt.style.cursor = 'grab'
                    }
                    else
                        myFunctions.alertFunction('Cannot Save an Empty Task!')
                }
            })

            dlt.addEventListener('click', () => {
                text_Area.classList.add('taskRemove')
                setTimeout(function () {
                    text_Area.classList.remove('taskRemove')
                    taskAreaAll.removeChild(text_Area)
                }, 200);
            })

            customChk.addEventListener('click', () => {
                if (!(txt.value.trim().length === 0)) {
                    customChk.classList.toggle('checkedBox')
                    text_Area.classList.toggle('toDelete')
                    if (customChk.getAttribute('data-buttonType') === 'notChecked') {
                        customChk.setAttribute('data-buttonType', 'Checked')
                        edt.style.pointerEvents = 'none'
                        txt.style.textDecoration = 'line-through'
                    }
                    else {
                        customChk.setAttribute('data-buttonType', 'notChecked')
                        edt.style.pointerEvents = 'all'
                        txt.style.textDecoration = 'none'
                    }
                }
                else
                    myFunctions.alertFunction('Cannot Mark Empty Task As Done!')
            })

            const clearCheckedTasks = document.querySelector('#clearCheckedTasks')
            clearCheckedTasks.addEventListener('click', () => {
                let toDeleteAll = [...document.querySelectorAll('.toDelete')]
                toDeleteAll.forEach(element => {
                    taskAreaAll.removeChild(element)
                });
                toDeleteAll = []
            })

            const clearAllTasks = document.querySelector('#clearAllTasks')
            clearAllTasks.addEventListener('click', () => {
                let allItems = [...document.querySelectorAll(".tasksArea")]
                allItems.forEach(element => {
                    taskAreaAll.removeChild(element)
                })
            })
        }

        else
            myFunctions.alertFunction('Cannot Make An Empty Task!')
    })

};

const myFunctions = {
    crtElements(crtElementTag, [...appendingClass], appendTo) {
        const createdElement = document.createElement(crtElementTag)

        appendingClass.forEach(element => {
            createdElement.classList.add(element)
        });

        appendTo.appendChild(createdElement)
        return createdElement
    },

    crtElementsWithAttributes(crtElementTag, [...appendingClass], customAttr, customAttrVal, appendTo) {
        const createdElement = this.crtElements(crtElementTag, [...appendingClass], appendTo)
        createdElement.setAttribute(customAttr, customAttrVal)
        return createdElement
    },

    alertFunction(alertText) {
        const modal = document.querySelector('.modal')
        const overlay = document.querySelector('.overlay')
        const modalClose = document.querySelector('.modalClose')
        const modalText = document.querySelector('.modal p')

        modal.addEventListener('keydown', (e) => {
            if (e.keyCode === 9) {
                e.preventDefault()
            }
        })

        modalText.innerText = alertText
        modal.classList.add('active')
        overlay.classList.add('active')

        modalClose.addEventListener('click', () => {
            modal.classList.remove('active')
            overlay.classList.remove('active')
            modal.removeEventListener('keydown', (e) => {
                if (e.keyCode === 9) {
                    e.preventDefault()
                }
            })

        })
    },
    displayDate(date) {
        const TodayDate = new Date()
        const month = TodayDate.toLocaleString('default', { month: 'long' });
        const day = TodayDate.toLocaleDateString('locale', { weekday: 'long' })
        date.innerHTML = `${day}, ${month} ${TodayDate.getDate()}`
    }
};


