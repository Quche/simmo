import React from 'react';

const submitBouton = document.getElementById("send_form");

function create_dict_from_form() {
    const inputs = document.getElementsByTagName("input");
    const inputs_array = Array.from(inputs);
    const inputs_values = inputs_array.map(input => input.value);
    const inputs_names = inputs_array.map(input => input.name);
    const inputs_dict = {};
    inputs_names.forEach((name, index) => {
        inputs_dict[name] = inputs_values[index];
    });
    return inputs_dict;
}

submitBouton.addEventListener("click", function () {
    const inputs_dict = create_dict_from_form();
    console.log('analysis inputs =' + inputs_dict.Array);
    var url = new URL("http://127.0.0.1:8080/project_analysis")
    url.search = new URLSearchParams(inputs_dict).toString();
    fetch(url,{
        method: "POST",
        body: JSON.stringify(inputs_dict)})
        .then (response => response.json())
        .then ((data) => {
            console.log(data);
            return data;
        })
});