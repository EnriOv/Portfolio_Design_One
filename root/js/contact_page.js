if(document.getElementById('contactform') !== null) {
    const form = document.getElementById('contactform');

    form.addEventListener('formdata', resetOnSubmit);

    function resetOnSubmit() {
        form.reset();
    }
}
else {
    /* In case something else wants to be done */
}