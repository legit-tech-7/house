from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from .models import Property, Agent

def index(request):
    featured_properties = Property.objects.filter(featured=True)[:6]
    all_properties = Property.objects.all()[:12]
    agents = Agent.objects.all()[:4]
    
    context = {
        'featured_properties': featured_properties,
        'properties': all_properties,
        'agents': agents,
    }
    return render(request, 'index.html', context)

def listings(request):
    property_list = Property.objects.all()
    
    # Filtering
    property_type = request.GET.get('type')
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')
    bedrooms = request.GET.get('bedrooms')
    city = request.GET.get('city')
    
    if property_type:
        property_list = property_list.filter(property_type=property_type)
    if min_price:
        property_list = property_list.filter(price__gte=min_price)
    if max_price:
        property_list = property_list.filter(price__lte=max_price)
    if bedrooms:
        property_list = property_list.filter(bedrooms__gte=bedrooms)
    if city:
        property_list = property_list.filter(city__icontains=city)
    
    # Pagination
    paginator = Paginator(property_list, 6)
    page_number = request.GET.get('page')
    properties = paginator.get_page(page_number)
    
    context = {
        'properties': properties,
        'property_types': Property.PROPERTY_TYPES,
    }
    return render(request, 'listings.html', context)

def property_detail(request, property_id):
    property_obj = get_object_or_404(Property, pk=property_id)
    related_properties = Property.objects.filter(
        property_type=property_obj.property_type
    ).exclude(pk=property_id)[:4]
    
    context = {
        'property': property_obj,
        'related_properties': related_properties,
    }
    return render(request, 'property_detail.html', context)

def agents(request):
    agents_list = Agent.objects.all()
    
    context = {
        'agents': agents_list,
    }
    return render(request, 'agents.html', context)

def contact(request):
    if request.method == 'POST':
        # Handle form submission
        # You would typically save to ContactMessage model here
        pass
    
    return render(request, 'contact.html')



from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse
from .forms import ContactForm

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            contact_message = form.save()
            
            # Send email notification (you'll need to configure email settings)
            # send_contact_email(contact_message)
            
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({'success': True})
            
            messages.success(request, 'Your message has been sent successfully!')
            return redirect('contact')
        else:
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({
                    'success': False, 
                    'errors': form.errors
                }, status=400)
            messages.error(request, 'Please correct the errors below.')
    else:
        form = ContactForm()
    
    return render(request, 'contact.html', {'form': form})

def about(request):
    return render(request, 'about.html')