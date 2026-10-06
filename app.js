import { supabase } from './supabaseClient.js';

const formSerie = document.getElementById('form-serie');

formSerie.addEventListener('submit', async (e) => {
  e.preventDefault();

  // 1. CAPTURA DE DATOS
  const titulo = document.getElementById('titulo').value;
  const tipo = document.getElementById('tipo').value;
  const genero = document.getElementById('genero').value;
  const anio = document.getElementById('anio').value;
  const plataforma = document.getElementById('plataforma').value;
  const puntuacion = parseFloat(document.getElementById('puntuacion').value);
  const fechaVista = document.getElementById('fecha-vista').value;
  const resena = document.getElementById('resena').value;
  const motivo = document.getElementById('motivo').value;

  const idealParaChecked = Array.from(document.querySelectorAll('input[name="ideal_para"]:checked'))
    .map(cb => cb.value);

  const volverAVer = document.querySelector('input[name="revision"]:checked')?.value || '';
  const contieneSpoilers = document.getElementById('spoilers').checked;

  const usuario = document.getElementById('usuario').value;
  const email = document.getElementById('email').value;

  const archivoInput = document.getElementById('imagen-file');
  const archivo = archivoInput.files[0];

  let imagenUrl = 'https://via.placeholder.com/300x400?text=Sin+Portada';

  // 2. SUBIDA DE ARCHIVO A STORAGE
  if (archivo) {
    const nombreArchivo = `${Date.now()}_${archivo.name}`;

    const { data: storageData, error: storageError } = await supabase.storage
      .from('portadas')
      .upload(nombreArchivo, archivo);

    if (storageError) {
      alert("Error al subir la imagen: " + storageError.message);
      console.error("Storage Error:", storageError);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('portadas')
      .getPublicUrl(nombreArchivo);

    imagenUrl = urlData.publicUrl;
  }

  // 3. ESTRUCTURA DEL OBJETO PARA LA BASE DE DATOS
  const nuevaSerie = {
    titulo: titulo,
    tipo: tipo,
    genero: genero,
    anio: anio ? parseInt(anio) : null,
    plataforma: plataforma,
    puntuacion: puntuacion,
    fecha_vista: fechaVista || null,
    resena: resena,
    motivo: motivo,
    ideal_para: idealParaChecked,
    volver_a_ver: volverAVer,
    spoilers: contieneSpoilers,
    usuario: usuario,
    user_email: email,
    imagen_url: imagenUrl
  };

  console.log("Enviando a Supabase:", nuevaSerie);

  // 4. INSERTAR EN LA TABLA 'series'
  const { data, error } = await supabase
    .from('series')
    .insert([nuevaSerie]);

  if (error) {
    console.error("Error al insertar en Supabase:", error);
    alert('Error al guardar en Supabase: ' + error.message);
  } else {
    alert('¡Serie recomendada y guardada con éxito!');
    formSerie.reset();
  }
});