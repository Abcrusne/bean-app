package lt2021.projektas.parentdetails;

import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lt2021.projektas.child.ChildDao;
import lt2021.projektas.kindergarten.registration.KindergartenRegistrationService;
import lt2021.projektas.logging.Log;
import lt2021.projektas.logging.LogDao;
import lt2021.projektas.userRegister.User;
import lt2021.projektas.userRegister.UserDao;

@Service
public class ParentDetailsService {
	
	@Autowired
	private ParentDetailsDao detailsDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired 
	private ChildDao childDao;
	
	@Autowired
	private KindergartenRegistrationService kgRegService;
	
	@Autowired
	private LogDao logDao;
	
	@Transactional
	public ServiceLayerDetails getParentDetails(long id) {
		User parent = userDao.findById(id).orElse(null);
		return new ServiceLayerDetails(parent.getParentDetails().getId(), parent.getParentDetails().getFirstname(), parent.getParentDetails().getLastname(), parent.getParentDetails().getEmail(),
				parent.getParentDetails().getPhone(), parent.getParentDetails().getPersonalCode(), parent.getParentDetails().getLivingAddress(), 
				parent.getParentDetails().getNumberOfKids(), parent.getParentDetails().isStudying(), parent.getParentDetails().getStudyingInstitution(),
				parent.getParentDetails().isHasDisability(), parent.getParentDetails().isDeclaredResidenceSameAsLiving(), parent.getParentDetails().getDeclaredAddress());
	}
	
	@Transactional
	public ResponseEntity<String> addParentDetails(ServiceLayerDetails parentDetails) {
		User parent = userDao.findById(parentDetails.getId()).orElse(null);
		if (parent != null) {
			if (childDao.findByPersonalCode(parentDetails.getPersonalCode()).isPresent()) {
				logDao.save(new Log(new Date(), parent.getEmail(), parent.getRole().toString(), "Bandyta supildyti t??vo duomenis. Panaudotas u??imtas asmens kodas"));
				return new ResponseEntity<String>("Asmens kodas jau u??imtas", HttpStatus.BAD_REQUEST);
			}
			parent.setParentDetails(new ParentDetails(parentDetails.getFirstname(), parentDetails.getLastname(), parentDetails.getEmail(), parentDetails.getPhone(),
					parentDetails.getPersonalCode(), parentDetails.getLivingAddress(), 
					parentDetails.getNumberOfKids(), parentDetails.isStudying(), parentDetails.getStudyingInstitution(), parentDetails.isHasDisability(), 
					parentDetails.isDeclaredResidenceSameAsLiving(), parentDetails.getDeclaredAddress()));
			parent = userDao.save(parent);
			logDao.save(new Log(new Date(), parent.getEmail(), parent.getRole().toString(), "U??pildyti t??vo duomenys (Details ID: " + parent.getParentDetails().getId() + ")"));
			return new ResponseEntity<String>("T??vo/glob??jo duomenys i??saugoti", HttpStatus.OK);
		}
		return new ResponseEntity<String>("T??vas/glob??jas neregistruotas sistemoje", HttpStatus.BAD_REQUEST);
	}
	
	@Transactional
	public ResponseEntity<String> updateParentDetails(ServiceLayerDetails parentDetails, long userId) {
		User parent = userDao.findById(userId).orElse(null);
		if (parent != null) {
			ParentDetails details = parent.getParentDetails();
			if (details != null) {
				if (childDao.findByPersonalCode(parentDetails.getPersonalCode()).isPresent()) {
					logDao.save(new Log(new Date(), parent.getEmail(), parent.getRole().toString(), "Bandyta keisti t??vo duomenis. Panaudotas u??imtas asmens kodas"));
					return new ResponseEntity<String>("Toks asmens kodas jau u??imtas", HttpStatus.BAD_REQUEST);
				}
				details.setFirstname(parentDetails.getFirstname());
				details.setLastname(parentDetails.getLastname());
				details.setEmail(parentDetails.getEmail());
				details.setPhone(parentDetails.getPhone());
				details.setPersonalCode(parentDetails.getPersonalCode());
				details.setLivingAddress(parentDetails.getLivingAddress());
				details.setNumberOfKids(parentDetails.getNumberOfKids());
				details.setStudying(parentDetails.isStudying());
				details.setStudyingInstitution(parentDetails.getStudyingInstitution());
				details.setHasDisability(parentDetails.isHasDisability());
				details.setDeclaredResidenceSameAsLiving(parentDetails.isDeclaredResidenceSameAsLiving());
				details.setDeclaredAddress(parentDetails.getDeclaredAddress());
				details = detailsDao.save(details);
				var children = details.getChildren().stream().collect(Collectors.toList());
				children.stream().forEach(child -> kgRegService.updateRegistrationOnParentOrChildInfoChange(child.getId()));
				logDao.save(new Log(new Date(), parent.getEmail(), parent.getRole().toString(), "Atnaujinti t??vo duomenys (Details ID: " + details.getId() + ")"));
				return new ResponseEntity<String>("Duomenys sekmingai pakeisti", HttpStatus.OK);
			}
			return new ResponseEntity<String>("T??vo/glob??jo duomenys neu??pildyti", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<String>("T??vas/glob??jas neregistruotas sistemoje", HttpStatus.BAD_REQUEST);
	}
	
}
