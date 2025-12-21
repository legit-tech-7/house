from django import forms
from .models import ContactMessage

class ContactForm(forms.ModelForm):
    consent = forms.BooleanField(
        required=True,
        error_messages={'required': 'You must agree to receive emails'}
    )
    
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'subject', 'message', 'property']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Your full name'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'Your email address'
            }),
            'phone': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Your phone number'
            }),
            'subject': forms.Select(attrs={'class': 'form-control'}),
            'message': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Your message',
                'rows': 6
            }),
            'property': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Property address or ID'
            }),
        }