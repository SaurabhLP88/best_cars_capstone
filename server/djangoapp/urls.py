# Uncomment the imports before you add the code
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views

app_name = 'djangoapp'
urlpatterns = [
    # # path for registration

    # path for login
    path(route='login', view=views.login_user, name='login'),
    path(route='logout', view=views.logout_request, name='logout'),
    path(route='register', view=views.registration, name='register'),

    path(
        'cars/<int:dealer_id>',
        views.get_cars,
        name='get_cars'
    ),

    path(
        'carsbymake/<int:dealer_id>/<str:make>',
        views.cars_by_make,
        name='cars_by_make'
    ),

    path(
        'carsbymodel/<int:dealer_id>/<str:model>',
        views.cars_by_model,
        name='cars_by_model'
    ),

    path(
        'carsbyyear/<int:dealer_id>/<int:year>',
        views.cars_by_year,
        name='cars_by_year'
    ),

    path(
        'carsbymaxmileage/<int:dealer_id>/<int:mileage>',
        views.cars_by_mileage,
        name='cars_by_mileage'
    ),

    path(
        'carsbyprice/<int:dealer_id>/<int:price>',
        views.cars_by_price,
        name='cars_by_price'
    ),

    # path for dealer reviews view
    path(route='get_dealers', view=views.get_dealerships, name='get_dealers'),
    path(
        route='get_dealers/<str:state>',
        view=views.get_dealerships,
        name='get_dealers_by_state'
    ),
    path(
        route='dealer/<int:dealer_id>',
        view=views.get_dealer_details,
        name='dealer_details'
    ),

    # path for add a review view
    path(
        'reviews/dealer/<int:dealer_id>',
        views.get_dealer_reviews,
        name='dealer_reviews'
    ),
    path(route='add_review', view=views.add_review, name='add_review'),

    path(
        route='get_inventory/<int:dealer_id>',
        view=views.get_inventory,
        name='get_inventory'
    ),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
