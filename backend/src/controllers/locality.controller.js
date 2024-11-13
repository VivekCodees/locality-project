import { Locality } from "../models/locality.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create locality:
const createLocality = asyncHandler(async (req, res) => {
  try {
    const { name, city, state, zipCode } = req.body;

    // check if all fields are present
    if (!name || !city || !state || !zipCode) {
      throw new ApiError(400, "All fields are required to create a locality");
    }

    // create and save new locality
    const newLocality = await new Locality({
      name,
      city,
      state,
      zipCode,
    }).save();

    // Respond with success message and data
    res
      .status(201)
      .json(new ApiResponse(201, newLocality, "Locality Created Successfully"));
  } catch (error) {
    throw new ApiError(500, "Failed to create locality");
  }
});

// Get All Localities:
const getAllLocalities = asyncHandler(async (req, res) => {
  try {

    const filter = {};

    if(req.query.name){
      filter.name =  {
        $regex: req.query.name, $options: 'i'
      };
    }
    if(req.query.city){
      filter.city = {
        $regex: req.query.city, $options: 'i'
      };
    }
    if(req.query.state){
      filter.state = {
        $regex: req.query.state, $options: 'i'
      };
    }
    if(req.query.zipCode){
      filter.zipCode = {
        $regex: req.query.zipCode, $options: 'i'
      };
    }

    const localities = await Locality.find(filter);

    

    res
      .status(201)
      .json(
        new ApiResponse(201, localities, "Localities Fetched Successfully")
      );
  } catch (error) {
    throw new ApiError(500, "Failed to fetch localities");
  }
});

// Get a specific locality by ID
const getLocalityById = asyncHandler(async (req, res) => {
  try {
    const locality = await Locality.findById(req.params.id);

    if (!locality) {
      throw new ApiError(404, "Locality not found");
    }

    res.status(201).json(new ApiResponse(201, locality, "Locality Found!!!"));
  } catch (error) {
    throw new ApiError(501, "Failed to fetch locality");
  }
});


// Update a locality by ID
const updateLocality = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params; // Corrected destructuring
    const { name, city, state, zipCode } = req.body;

    if (!name && !city && !state && !zipCode) {
      return next(
        new ApiError(400, "At least one field must be provided to update the locality")
      );
    }

    // Find and update locality
    const updatedLocality = await Locality.findByIdAndUpdate(
      id,
      { name, city, state, zipCode },
      { new: true, runValidators: true }
    );

    if (!updatedLocality) { // Corrected check
      return next(new ApiError(404, "Locality not found"));
    }

    res.status(200).json(new ApiResponse(200, updatedLocality, "Locality updated successfully"));

  } catch (error) {
    next(new ApiError(500, "Failed to update locality"));
  }
});


// Delete Locality

const deleteLocality = asyncHandler(async (req, res, next) => {
  try {
      const locality = await Locality.findByIdAndDelete(req.params.id);
      if (!locality) {
          return next(new ApiError(404, 'Locality not found'));
      }

      // Respond with a 200 status code and a successful deletion message
      res.status(200).json(new ApiResponse(200, locality, 'Locality deleted successfully'));

  } catch (error) {
      next(new ApiError(500, 'Failed to delete locality', error));
  }
});


export { createLocality, getAllLocalities, getLocalityById, updateLocality, deleteLocality }