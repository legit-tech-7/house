from django.contrib import admin

# Register your models here.
from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Property, PropertyImage, Agent, ContactMessage

class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 3

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ['title', 'property_type', 'price', 'city', 'featured', 'created_at']
    list_filter = ['property_type', 'featured', 'city']
    search_fields = ['title', 'address', 'city', 'description']
    inlines = [PropertyImageInline]

@admin.register(Agent)
class AgentAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'email', 'years_experience', 'properties_sold']

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at']
    readonly_fields = ['created_at']