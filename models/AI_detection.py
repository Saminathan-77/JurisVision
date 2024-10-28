import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from transformers import BertTokenizer, TFBertForSequenceClassification
import ftfy
from sklearn.utils import resample


data = pd.read_csv('/content/labelled_train_set.csv')

data['Article'] = data['Article'].apply(ftfy.fix_text)

label_mapping = {'Human-written': 0, 'AI-generated': 1}
data['label'] = data['Type'].map(label_mapping)


train_texts, test_texts, train_labels, test_labels = train_test_split(data['Article'], data['label'], test_size=0.2, random_state=42)
data_human = data[data['Type'] == 'Human-written']
data_ai = data[data['Type'] == 'AI-generated']

data_ai_upsampled = resample(data_ai,
                             replace=True,
                             n_samples=len(data_human),
                             random_state=42)

data = pd.concat([data_human, data_ai_upsampled])

data = data.sample(frac=1, random_state=42).reset_index(drop=True)
train_texts, temp_texts, train_labels, temp_labels = train_test_split(data['Article'], data['label'], test_size=0.3, random_state=42)
val_texts, test_texts, val_labels, test_labels = train_test_split(temp_texts, temp_labels, test_size=0.5, random_state=42)

tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

train_encodings = tokenizer(train_texts.tolist(), truncation=True, padding=True, max_length=128)
val_encodings = tokenizer(val_texts.tolist(), truncation=True, padding=True, max_length=128)
test_encodings = tokenizer(test_texts.tolist(), truncation=True, padding=True, max_length=128)

train_dataset = tf.data.Dataset.from_tensor_slices((
    dict(train_encodings),
    train_labels.tolist()
))

val_dataset = tf.data.Dataset.from_tensor_slices((
    dict(val_encodings),
    val_labels.tolist()
))

test_dataset = tf.data.Dataset.from_tensor_slices((
    dict(test_encodings),
    test_labels.tolist()
))

model = TFBertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)

optimizer = tf.keras.optimizers.Adam(learning_rate=5e-5)
loss = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)
metric = tf.keras.metrics.SparseCategoricalAccuracy('accuracy')

model.compile(optimizer=optimizer, loss=loss, metrics=[metric])

model.fit(train_dataset.shuffle(1000).batch(32), epochs=8, validation_data=val_dataset.batch(32))

predictions = model.predict(test_dataset.batch(32))['logits']
predicted_labels = predictions.argmax(axis=1)

print(classification_report(test_labels, predicted_labels))

from sklearn.metrics import f1_score
macro_f1 = f1_score(test_labels, predicted_labels, average='macro')
print("Macro F1-score:", macro_f1)

def predict_text(text, model, tokenizer):
      """Predicts the label for a given text using the provided model and tokenizer."""

      encodings = tokenizer(text, truncation=True, padding=True, return_tensors='tf')

      prediction = model.predict(dict(encodings)).logits
      pred = tf.argmax(prediction, axis=1).numpy()[0]

      return pred

user_text = "The advance sou limiting car usage is not only helping the community but also yourself. In Vauban, GermanyÂ 70 percent out heir families do not own cars, and 57 percent sold a car to live here. People find it better to walk to places rather than having to use a vehicle. 'All of our development since World War II has been centered on the car, and that will have to change,' said David Goldberg, an official of Transportation America. The Environmental Protection Agency is promoting 'car reduced' communities. Delivery companies complained of lost revenue, while exceptions were made for plugin cars. It was the third straight year cars have been banned with only buses and taxis permitted for the Day Without Cars in this capital cit you 7 million. 'Its a good opportunity to take away stress and lower air pollution,' said businessman Carlos Arturo Plaza as he rode a two seat bicycle with his wife. Two other Columbian cities, Cali and Valledupar, joined the event. The day without cars is part of an improvement campaign that began in BogotÃ¡ in the mid1990s. In parks and sports centers their pitted sidewalks have been replaced by broad, smooth, sidewalks. With all these changes, people who stopped car commuting as a result of the recession may find less reason to resume the habit. New Yorks new bike sharing program and its skyrocketing bridge and tunnel tolls reflect those new priorities. A study last year found that driving by young people decreased 23 percent between 2001 and 2009. Bill Ford, executive chairman of the Ford Motor Company, proposed partnering with the telecommutes industry to create cities in which pedestrian, bicycle, private cars, commercial and public transportation traffic are woven into a connected network to save time, conserve resources lower emissions and improve safety."
predicted_label = predict_text(user_text, model, tokenizer)
print(f"Predicted label: {predicted_label}")
unlabelled_data = pd.read_csv('/content/unlabelled_test2.csv')

predictions = []
for text in unlabelled_data['Article']:
  predicted_label = predict_text(text, model, tokenizer)
  predictions.append(predicted_label)

result_df = pd.DataFrame({
    'ID': unlabelled_data['ID'],
    'Predicted Type': predictions
})

result_df.to_csv('predictions.csv', index=False)