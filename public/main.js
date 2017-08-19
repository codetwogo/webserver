
window.onload = function () {
    const submitBtn = document.getElementById('submit-button');
    const form = document.getElementById('form');
    const errHandler = document.getElementById('error-handler');

    const propertyList = ['name', 'title', 'description', 'difficulty', 'inputs', 'outputs', 'boilerplate'];

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        for (var i = 0; i < propertyList.length; ++i) {
            if (!form[propertyList[i]].value || form[propertyList[i]].value === '') {
                errHandler.style.display = 'block'
                errHandler.textContent = `Please fill out the input field for ${propertyList[i]}!`;
                break;
            }
        }

        form.submit();
    }, false)

}